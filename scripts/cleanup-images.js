import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define directories to scan
const directories = [
    path.join(__dirname, '../src/assets'),
    path.join(__dirname, '../public/images')
];

async function cleanupImages() {
    console.log("Starting cleanup of original images...");

    for (const dir of directories) {
        console.log(`\nScanning directory: ${dir}`);
        try {
            if (!fs.existsSync(dir)) {
                console.log(`Directory not found: ${dir}`);
                continue;
            }

            const files = fs.readdirSync(dir);
            // Find all webp files
            const webpFiles = new Set(files.filter(file => /\.webp$/i.test(file)));

            // Find original files that have a webp counterpart
            const originals = files.filter(file => {
                if (/\.(jpe?g|png)$/i.test(file)) {
                    const webpName = file.replace(/\.(jpe?g|png)$/i, '.webp');
                    return webpFiles.has(webpName);
                }
                return false;
            });

            console.log(`Found ${originals.length} redundant original files.`);

            for (const file of originals) {
                const filePath = path.join(dir, file);
                console.log(`Deleting ${file}...`);
                fs.unlinkSync(filePath);
            }
        } catch (err) {
            console.error(`Error processing directory ${dir}:`, err);
        }
    }
    console.log('\nCleanup complete!');
}

cleanupImages();
