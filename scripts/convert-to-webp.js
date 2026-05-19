import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define directories to scan
const directories = [
    path.join(__dirname, '../src/assets'),
    path.join(__dirname, '../public/images')
];

async function convertImages() {
    console.log("Starting global image conversion...");

    for (const dir of directories) {
        console.log(`\nProcessing directory: ${dir}`);
        try {
            if (!fs.existsSync(dir)) {
                console.log(`Directory not found: ${dir}`);
                continue;
            }

            const files = fs.readdirSync(dir);
            // Match jpg, jpeg, png (case insensitive)
            const imageFiles = files.filter(file => /\.(jpe?g|png)$/i.test(file));

            console.log(`Found ${imageFiles.length} images to convert in ${path.basename(dir)}`);

            for (const file of imageFiles) {
                const inputPath = path.join(dir, file);
                const outputPath = path.join(dir, file.replace(/\.(jpe?g|png)$/i, '.webp'));

                // Skip if output file already exists and is newer?? 
                // No, user said "ensure every image is converted", so we overwrite to be safe.

                try {
                    const originalSize = fs.statSync(inputPath).size;

                    await sharp(inputPath)
                        .webp({ quality: 80 })
                        .toFile(outputPath);

                    const newSize = fs.statSync(outputPath).size;
                    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

                    console.log(`Converted ${file}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (-${reduction}%)`);
                } catch (err) {
                    console.error(`Error converting ${file}:`, err.message);
                }
            }
        } catch (err) {
            console.error(`Error accessing directory ${dir}:`, err);
        }
    }
    console.log('\nGlobal conversion complete!');
}

convertImages();
