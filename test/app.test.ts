import { ServerApp } from '../src/presentation/server-app';

describe('app.ts', () => {


    test('should call Server.run with values', async() => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '5', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];

        await import('../src/app')

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 5,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination'
        });
        
    });

});