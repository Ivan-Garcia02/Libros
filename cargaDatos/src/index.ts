import path from 'path';
import axios from 'axios';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import csv from 'csv-parser';

const directoryPath = path.join(__dirname, '../data');
const apiEndpoint = 'http://localhost:3000/book';

interface BookInterface {
  name: string;
  author: string;
  gender: string;
  year: number;
  ubication: string;
}

export async function readAndSendBooks(directory: string, apiUrl: string) {
  try {
    const filePath = path.join(directory, 'books.csv');
    const outputFilePath = path.join(directory, 'booksOut.txt');
    const errorFilePath = path.join(directory, 'errors.txt');

    const results: BookInterface[] = [];

    // Read and parse the CSV file with the correct encoding
    const stream = fs.createReadStream(filePath)
      .pipe(csv({
        separator: ';',
        headers: ['name', 'author', 'gender', 'year', 'ubication'],
        skipLines: 1 // Skip the original header line
      }))
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const book of results) {
          try {
            const response = await axios.post(apiUrl, book);

            const responseData = response.data;
            const id = responseData._id;
            const name = responseData.name;

            await fsPromises.appendFile(outputFilePath, `${name} - ${id}\n`);
          } catch (error) {
            const errorMessage = `Name: ${book.name}, Status: ${error.response?.status || 'N/A'}, Error: ${error.response?.data.message || error.message}\n`;
            await fsPromises.appendFile(errorFilePath, errorMessage);
          }
        }
      });

    await new Promise<void>((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

(async () => {
  try {
    await readAndSendBooks(directoryPath, apiEndpoint);
  } catch (error) {
    console.error('Error:', error);
  }
})();