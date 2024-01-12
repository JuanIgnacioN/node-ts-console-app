import fs from 'fs';
import { SaveFile } from '../src/domain/use-cases/save-file.use-case'


describe('SaveFileUseCase', () => {

    const options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }

    afterEach(() => {
        if (fs.existsSync('outputs'))
            fs.rmSync('outputs', { recursive: true })

        if (fs.existsSync(options.fileDestination))
            fs.rmSync(options.fileDestination, { recursive: true })
    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'

        //TODO: Dentro del scope de este test, se toma el siguiente options. Si no existiera, se tomaría el declarado arriba
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options);

        expect(result).toBe(true);

        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });


    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const filePath = `${options.fileDestination}/${options.fileName}.txt`;

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('Should return false if directory could not be created', () => {
        
        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing'); }
        );

        const result = saveFile.execute(options);

        expect(result).toBe(false);
        
        // mockImplementation - clear de los valores para que no afecte a las demás pruebas.
        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not be created', () => {
        
        const saveFile = new SaveFile();

        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message'); }
        );

        const result = saveFile.execute(options);

        expect(result).toBe(false);

        writeFileSpy.mockRestore();

    });

})