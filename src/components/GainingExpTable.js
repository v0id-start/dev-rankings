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
                        <td><i>300</i></td>
                        <td>Computer Science Class (semester)</td>
                    </tr>

                    <tr>
                        <td><i>100</i></td>
                        <td>Certification</td>
                    </tr>

                    <tr>
                        <td><i>???</i></td>
                        <td>Mrs. Price Discretionary</td>
                    </tr>

                    <tr>
                        <td><i>100</i></td>
                        <td>TSA Member (per year)</td>
                    </tr>
                </tbody>
            </Table>
        </div>
      );
}

export default GainingExpTable;