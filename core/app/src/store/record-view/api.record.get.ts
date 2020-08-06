import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';

@Injectable({
    providedIn: 'root'
})
export class RecordViewGQL {

    constructor(private apollo: Apollo) {
    }

    /**
     * Fetch data from backend
     *
     * @param {string} module name
     * @param {string} record id
     * @param {object} metadata with the fields to ask for
     * @returns {object} Observable<ApolloQueryResult<any>>
     */
    public fetch(
        module: string,
        record: string,
        metadata: { fields: string[] }
    ): Observable<ApolloQueryResult<any>> {
        const fields = metadata.fields;

        const queryOptions = {
            query: gql`
            query recordView($module: String!, $record: String!) {
                getRecordView(module: $module, record: $record) {
                    ${fields.join('\n')}
                }
            }
        `,
            variables: {
                module,
                record,
            },
        };

        return this.apollo.query(queryOptions);
    }
}
