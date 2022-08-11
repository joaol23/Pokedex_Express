import { Business } from './Business.js';
import { GradesProps } from '../data/@types/Grades.js';
import { PATH_GRADES_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';
import { NOT_FOUND } from '../config/Config.js';

export class GradesBusiness extends Business {
    constructor() {
        super();
    }

    async updateGrade(id: number, newGrade: GradesProps) {
        const grades: GradesProps[] = await this.model.getData(PATH_GRADES_DATABASE, true, 'grades');
        const indexGradeSelected = super.getIndexDataByParameter('id', grades, id);
        if (indexGradeSelected == -1) {
            throw new Exception(NOT_FOUND, "Nota não encontrada", false);
        }
        const newGrades = super.updateData(grades, newGrade, indexGradeSelected);
        await super.insertData(PATH_GRADES_DATABASE, newGrades, true, 'grades');
        return newGrades[indexGradeSelected];
    }
}
