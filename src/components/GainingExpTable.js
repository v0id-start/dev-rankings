import { Table} from 'react-bootstrap';

function GainingExpTable() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Gaining Experience</h1>
            <Table bordered hover style={{ maxWidth: '45%' }}>
                <thead>
                <tr>
                    <th>Experience</th>
                    <th>Achievement</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i>50</i></td>
                        <td>Complete CS EHS Class (semester)</td>
                    </tr>

                    <tr>
                        <td><i>20</i></td>
                        <td>Certification</td>
                    </tr>

                    <tr>
                        <td><i>1-3</i></td>
                        <td>Project Completion</td>
                    </tr>

                    <tr>
                        <td><i>???</i></td>
                        <td>Mrs. Price Discretionary</td>
                    </tr>

                    <tr>
                        <td><i>20</i></td>
                        <td>TSA Member (per year)</td>
                    </tr>
                </tbody>
            </Table>
        </div>
      );
}

export default GainingExpTable;