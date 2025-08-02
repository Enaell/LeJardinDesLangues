import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script de migration des imports pour utiliser les alias de chemin
 * Usage: node scripts/migrate-imports.js
 */

// Configuration des alias
const ALIASES = {
  // Core imports
  '../core': '@core',
  '../../core': '@core',
  '../../../core': '@core',
  '../../../../core': '@core',
  '../core/': '@core/',
  '../../core/': '@core/',
  '../../../core/': '@core/',
  '../../../../core/': '@core/',

  // Features imports
  '../features': '@features',
  '../../features': '@features',
  '../../../features': '@features',
  '../../../../features': '@features',
  '../features/': '@features/',
  '../../features/': '@features/',
  '../../../features/': '@features/',
  '../../../../features/': '@features/',

  // Routes imports
  '../routes': '@routes',
  '../../routes': '@routes',
  '../../../routes': '@routes',
  '../../../../routes': '@routes',
  '../routes/': '@routes/',
  '../../routes/': '@routes/',
  '../../../routes/': '@routes/',
  '../../../../routes/': '@routes/',

  // Store imports
  '../store': '@store',
  '../../store': '@store',
  '../../../store': '@store',
  '../../../../store': '@store',
  '../store/': '@store/',
  '../../store/': '@store/',
  '../../../store/': '@store/',
  '../../../../store/': '@store/',
};

function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let hasChanges = false;

  // Remplacer les imports
  for (const [oldPath, newPath] of Object.entries(ALIASES)) {
    const importRegex = new RegExp(`(import.*from\\s+['"])${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    const exportRegex = new RegExp(`(export.*from\\s+['"])${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');

    if (importRegex.test(newContent) || exportRegex.test(newContent)) {
      newContent = newContent.replace(importRegex, `$1${newPath}`);
      newContent = newContent.replace(exportRegex, `$1${newPath}`);
      hasChanges = true;
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Migré: ${filePath}`);
    return true;
  }

  return false;
}

async function main() {
  console.log('🚀 Démarrage de la migration des imports...\n');

  // Chercher tous les fichiers TypeScript/React
  const files = await glob('src/**/*.{ts,tsx}', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });

  let migratedCount = 0;

  files.forEach(file => {
    if (migrateFile(file)) {
      migratedCount++;
    }
  });

  console.log(`\n🎉 Migration terminée ! ${migratedCount} fichier(s) migré(s).`);
  console.log('\n📝 N\'oubliez pas de:');
  console.log('  1. Redémarrer le serveur de développement');
  console.log('  2. Redémarrer le serveur TypeScript dans VS Code (Ctrl+Shift+P > "TypeScript: Restart TS Server")');
  console.log('  3. Vérifier que tout compile correctement');
}

main().catch(console.error);