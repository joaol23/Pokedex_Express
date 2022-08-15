import { Business } from './Business.js';
import { GradesProps } from '../data/@types/Grades.js';
import { PATH_GRADES_DATABASE } from '../config/ConfigPath.js';
import { Exception } from '../Exception/Exception.js';
import { NOT_FOUND } from '../config/Config.js';
import { avaregeArray, sumArray, topN } from '../lib/Math.js';

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

    getGradesWithoutId(grades: GradesProps[], id: string) {
        return grades.filter(grade => grade.id != id);
    }

    async deleteGrade(id: string) {
        const grades = await super.getData(PATH_GRADES_DATABASE, true, 'grades');
        const newGrades = this.getGradesWithoutId(grades, id);
        return await super.insertData(PATH_GRADES_DATABASE, newGrades, true, 'grades')
    }

    async getGradeById(data: { id: number | string }): Promise<GradesProps> {
        const grades: GradesProps[] = await super.getData(PATH_GRADES_DATABASE, true, 'grades');
        const grade = super.getDataByParameter('id', grades, data.id.toString(), true);
        if (!grade) {
            throw new Exception(NOT_FOUND, 'Nota não encontrada', false);
        }
        return grade;
    }

    async getAllGrades(data: any): Promise<GradesProps[]> {
        return await super.getData(PATH_GRADES_DATABASE, true, 'grades');
    }

    async getFinalGrade(data: { student: string, subject: string }): Promise<number> {
        const grades = await this.getGradeByStudentAndSubject(data);
        return sumArray(grades, 'value')
    }

    async getGradeByStudentAndSubject(data: { student: string, subject: string }): Promise<GradesProps[]> {
        const grades: GradesProps[] = await super.getData(PATH_GRADES_DATABASE, true, 'grades');
        const gradesByStudent = super.getDataByParameter('student', grades, data.student);
        if (gradesByStudent.length == 0) {
            throw new Exception(NOT_FOUND, "Aluno não encontrado", false);
        }
        const gradesSubjectOfStudent = super.getDataByParameter('subject', gradesByStudent, data.subject);
        if (gradesSubjectOfStudent.length == 0) {
            throw new Exception(NOT_FOUND, "Aluno não possui essa matéria", false);
        }

        return gradesSubjectOfStudent;
    }

    async getAvaregeGrade(data: { student: string, subject: string }) {
        const grades = await this.getGradeByStudentAndSubject(data);
        return avaregeArray(grades, 'value')
    }

    async getTopThreeStudents(data: { subject: string }) {
        const grades: GradesProps[] = await super.getData(PATH_GRADES_DATABASE, true, 'grades');
        const gradesBySubject = super.getDataByParameter('subject', grades, data.subject);
        if (gradesBySubject.length == 0) {
            throw new Exception(NOT_FOUND, "Nenhum aluno possui essa matéria", false);
        }
        return topN(gradesBySubject, 3, 'value')
    }

    getMethodListGrade(method: string) {
        const methods = {
            "getById": "getGradeById",
            "getAll": "getAllGrades",
            "getFinal": "getFinalGrade",
            "getAvarege": "getAvaregeGrade",
            "getTopThree": "getTopThreeStudents"
        }

        return methods.hasOwnProperty(method) ? methods[method as keyof typeof methods] : null;
    }
}
