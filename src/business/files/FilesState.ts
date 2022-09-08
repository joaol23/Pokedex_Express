import { Business } from '../Business.js';
import { FavoriteProps } from '../../data/@types/Favorites.js'
import { getAllFilesFromDirectory } from '../../lib/files-handler/Directory.js';
import { getDataArrayFromFile } from '../../lib/files-handler/ReadFile.js';
import { CitiesProps } from '../../data/@types/files-states/Cities.js';
import { FilesStateProps } from '../../data/@types/files-states/FilesState.js';
import { StateProps } from '../../data/@types/files-states/State.js';
import { createFile } from '../../lib/files-handler/CreateFiles.js';

export class FilesStateBusiness extends Business {
    PATH_STATE_FILES = 'database/files-state/';

    constructor() {
        super();
    }

    getNamespace(): string {
        return 'files/'
    }

    async getFilesState(): Promise<FilesStateProps[]> {
        if (!(await this.checkFilesExists())) {
            this.createFilterStateFiles();
        }
        return await this.getFiles();
    }


    async getFiles(): Promise<FilesStateProps[]> {
        let filesNames = await getAllFilesFromDirectory(this.PATH_STATE_FILES);
        let states: StateProps[] = await getDataArrayFromFile(this.model.getPathState());

        const files = await filesNames.map(async (fileName, index) => {
            let siglaState = fileName.split("_")[0];
            let fileState = states.find(state => state.initials === siglaState);
            let countCitiesByState: number = (await getDataArrayFromFile(this.PATH_STATE_FILES + fileName)).length;

            return {
                id: index,
                fileName: fileName,
                fileState: fileState,
                countCities: countCitiesByState,
                type: "json"
            }
        })

        return Promise.all(files);
    }

    async  createFilterStateFiles(): Promise<void> {
        const states = await getDataArrayFromFile(this.model.getPathState());
        const cities = await getDataArrayFromFile(this.model.getPathCities());

        this.createFiles(states, cities)
    }

    async createFiles(states: StateProps[], cities: CitiesProps[]): Promise<void> {
        states.forEach(async (state) => {
            const citiesFromState = this.filterCitiesByState(state, cities);
            await createFile(this.PATH_STATE_FILES + state.initials + "_" + state.id + ".json", citiesFromState);
        })
    }

    filterCitiesByState(state: StateProps, cities: CitiesProps[]): CitiesProps[] {
        return cities.filter(city => city.state_id === state.id);
    }

    async checkFilesExists(): Promise<boolean> {
        let files = await getAllFilesFromDirectory(this.PATH_STATE_FILES);
        return (files.length != 0);
    }

    async getPathByIdFileState(id: string): Promise<string> {
        let files = await getAllFilesFromDirectory(this.PATH_STATE_FILES);
        const file = files.filter(file => file.split('.')[0].split("_")[1] == id)
        return this.PATH_STATE_FILES + file[0];
    }

    async getFileById(id: string): Promise<FilesStateProps> {
        const path = await this.getPathByIdFileState(id);
        return await getDataArrayFromFile(path);
    }
}
