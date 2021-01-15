import {selector} from 'recoil'
import DeadlineList from './deadlinelist'
import {getNearestDate} from '../chromeAPI/retrieveDeadlineJSON'
import NearestDateType from '../types/nearestdateType'
import { RecoilValueReadOnly } from 'recoil';

const NearestDate: RecoilValueReadOnly<NearestDateType> = selector({
    key: "nearestdate",
    get: ({get}) => {

        // first retrieve the atom state
        const reslist = get(DeadlineList);
        const nearest = getNearestDate(reslist);
        const len: number = nearest.length;

        let schools: string[];
        let dates: string[];

        if (len === 0){
            schools = ["No schools registered"];
            dates = [""];

        } else if (len === 1){
            schools = [nearest[0].school];
            dates = [nearest[0].date];
            
        } else if (len <= 16) {
            // we need to render a lot of stuff
            schools = [];
            dates = [];

            for (const elem of nearest) {
                schools.push(elem.school);
                dates.push(elem.date);
            }

        } else {
            schools = ["error"];
            dates = ["error"];
        }

        return {
            schools,
            dates
        };
    }
});

export default NearestDate;