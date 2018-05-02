import React from 'react';
import {Table} from 'semantic-ui-react';
import moment from 'moment';
import GtfsControls from './GtfsControls'

let GtfsRow = ({gtfs, isAdmin}) => <tr>
    <Table.Cell>{gtfs.gtfsFileId}</Table.Cell>
    <Table.Cell>{gtfs.originalName}</Table.Cell>
    <Table.Cell>{gtfs.status}</Table.Cell>
    <Table.Cell>{gtfs.valid === null ? '' : gtfs.valid? "Valid": "Invalid"}</Table.Cell>
    <Table.Cell className="td-nowrap" >{moment(gtfs.uploadedUtc).format('lll')}</Table.Cell>
    <Table.Cell className="td-nowrap" >{gtfs.calendarFrom ? moment(gtfs.calendarFrom).format('ll') : ''}</Table.Cell>
    <Table.Cell className="td-nowrap" >{gtfs.calendarTo? moment(gtfs.calendarTo).format('ll') : ''}</Table.Cell>
    {isAdmin? <Table.Cell className="td-nowrap" > <GtfsControls gtfsFile={gtfs} /></Table.Cell> : null}
</tr>


class GtfsTable extends React.Component {
    render() {
        const gtfsFiles = this.props.gtfsFiles.length > 0? this.props.gtfsFiles.map((gtfs, index) => (
            <GtfsRow  key={index} gtfs={gtfs} isAdmin= { this.props.isAdmin} />
        )) : <tr></tr>;

        return(
            <Table celled striped>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Cloud Name</Table.HeaderCell>
                    <Table.HeaderCell>Original Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Validity</Table.HeaderCell>
                    <Table.HeaderCell>Uploaded Utc</Table.HeaderCell>
                    <Table.HeaderCell className="td-nowrap">Calendar From</Table.HeaderCell>
                    <Table.HeaderCell>Calendar To</Table.HeaderCell>
                    {this.props.isAdmin? <Table.HeaderCell></Table.HeaderCell> : null }
                </Table.Row>
                </Table.Header>
               
                <Table.Body>
                    {gtfsFiles}
                </Table.Body>
            </Table>
        );
    }
}
export default GtfsTable;