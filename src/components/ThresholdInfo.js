import { Table} from 'react-bootstrap';
import * as CONSTANTS from '../utils/constants.js';

function ThresholdInfo() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Dev Rankings</h1>
            <Table bordered hover style={{ maxWidth: '45%' }}>
                <thead>
                <tr>
                    <th>Experience</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i>0-{CONSTANTS.INTERN_THRESH}</i></td>
                        <td style={{color: "brown"}}><b>Intern</b></td>
                    </tr>

                    <tr>
                        <td><i>{CONSTANTS.INTERN_THRESH}-{CONSTANTS.JR_THRESH}</i></td>
                        <td style={{color: "green"}}><b>Jr. Developer</b></td>
                    </tr>

                    <tr>
                        <td><i>{CONSTANTS.JR_THRESH}-{CONSTANTS.DEV_1_THRESH}</i></td>
                        <td style={{color: "purple"}}><b>Developer I</b></td>
                    </tr>

                    <tr>
                        <td><i>{CONSTANTS.DEV_1_THRESH}-{CONSTANTS.DEV_2_THRESH}</i></td>
                        <td style={{color: "orange"}}><b>Developer II</b></td>
                    </tr>

                    <tr>
                        <td><i>{CONSTANTS.DEV_2_THRESH}-{CONSTANTS.DEV_3_THRESH}</i></td>
                        <td style={{color: "yellowgreen"}}><b>Developer III</b></td>
                    </tr>

                    <tr>
                        <td><i>{CONSTANTS.DEV_3_THRESH}-{CONSTANTS.SENIOR_THRESH}</i></td>
                        <td style={{color: "red"}}><b>Sr. Developer</b></td>
                    </tr>

                    <tr>
                        <td><i>{CONSTANTS.SENIOR_THRESH}+</i></td>
                        <td style={{color: "gold"}}><b>Guru</b></td>
                    </tr>
                </tbody>
            </Table>
        </div>
      );
}

export default ThresholdInfo;