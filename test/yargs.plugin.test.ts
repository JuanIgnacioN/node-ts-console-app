/**
 * TODO: como yarg se ejecuta al iniciar la aplicación, es necesario en primera instancia verificar los process.argv. Luego destructurar el objeto. Debe ser asíncrono para que cuando llamemos al runCommand esperemos a que termine la ejecución y podamos evaluar en el testing lo que queramos.
 **/

const runCommand = async(args: string[]) => {

    process.argv = [... process.argv, ...args];

    const { yarg } = await import('../src/config/plugins/yargs.plugin')

    return yarg;
}

describe('yargs.plugin.test', () =>{

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default value', async() => {
        
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }));
    });

    test('should return configuration with custom values', async() =>{
        const argv = await runCommand(['-b', '4', '-l', '5', '-s', '-n', 'test', '-d', 'test-folder'])

        expect(argv).toEqual(expect.objectContaining({
            b: 4,
            l: 5,
            n: 'test',
            d: 'test-folder'
        }));
        
    });

});