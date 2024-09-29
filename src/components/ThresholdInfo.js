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
                    <th>Salary</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(CONSTANTS.thresholds).map((value, key) => (
                        <tr key={key}>
                            <td>
                                <i>{CONSTANTS.thresholds[value].points - 500} - {CONSTANTS.thresholds[value].points}</i>
                            </td>

                            <td style={{color: CONSTANTS.thresholds[value].color}}>
                                <b> {CONSTANTS.thresholds[value].title} </b>
                            </td>

                            <td>
                                {CONSTANTS.thresholds[value].salary}₽
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td><i>1,000,000</i></td>
                        <td style={{color: "gold"}}><b>Guru</b></td>
                        <td>∞₽</td>
                    </tr>
                </tbody>
            </Table>
        </div>
      );
}

export default ThresholdInfo;