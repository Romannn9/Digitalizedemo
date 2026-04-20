import * as ftp from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG = {
  host:     process.env.FTP_HOST     || 'ze617275.ftp.tools',
  port:     Number(process.env.FTP_PORT) || 21,
  user:     process.env.FTP_USER     || 'ze617275_wprazrab',
  password: process.env.FTP_PASS     || '',
  remotePath: process.env.FTP_REMOTE || '/digitalize.com.ua/www/wp-content/themes/digitalize',
};

async function deploy() {
  if (!CONFIG.password) {
    // читаємо з .env.deploy якщо є
    const envFile = path.join(__dirname, '.env.deploy');
    if (fs.existsSync(envFile)) {
      const lines = fs.readFileSync(envFile, 'utf8').split('\n');
      for (const line of lines) {
        const [key, val] = line.split('=');
        if (key && val) process.env[key.trim()] = val.trim();
      }
      CONFIG.password = process.env.FTP_PASS || '';
    }
  }

  if (!CONFIG.password) {
    console.error('❌  Вкажи FTP_PASS в .env.deploy або через змінну оточення');
    process.exit(1);
  }

  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.socket.setKeepAlive(true);

  try {
    console.log(`🔌 Підключаємось до ${CONFIG.host}...`);
    await client.access({
      host:     CONFIG.host,
      port:     CONFIG.port,
      user:     CONFIG.user,
      password: CONFIG.password,
      secure:   false,
    });
    console.log('✅ З\'єднано');

    // Завантажуємо всі PHP/CSS файли теми (включно з підпапками)
    const themeDir = path.join(__dirname, 'wp-theme');
    async function uploadDir(localDir, remoteDir) {
      const entries = fs.readdirSync(localDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === 'dist') continue;
        const localPath  = path.join(localDir, entry.name);
        const remotePath = `${remoteDir}/${entry.name}`;
        if (entry.isDirectory()) {
          await client.ensureDir(remotePath);
          await uploadDir(localPath, remotePath);
        } else if (entry.name.endsWith('.php') || entry.name.endsWith('.css')) {
          await client.uploadFrom(localPath, remotePath);
          console.log(`📄 ${remotePath.replace(CONFIG.remotePath, '')}`);
        }
      }
    }
    await uploadDir(themeDir, CONFIG.remotePath);

    // Завантажуємо dist/ (збірку React)
    const distPath = path.join(__dirname, 'wp-theme', 'dist');
    if (!fs.existsSync(distPath)) {
      console.error('❌  wp-theme/dist/ не знайдено. Спочатку зроби: npm run build:wp');
      process.exit(1);
    }

    console.log('📦 Завантажуємо dist/...');
    await client.uploadFromDir(distPath, `${CONFIG.remotePath}/dist`);
    console.log('✅ Deploy завершено!');
    console.log(`🌐 https://www.digitalize.com.ua`);

  } catch (err) {
    console.error('❌ Помилка:', err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
