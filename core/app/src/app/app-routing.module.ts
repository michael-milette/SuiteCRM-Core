import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlMatchResult, UrlSegment} from '@angular/router';
import {ClassicViewUiComponent} from '@components/classic-view/classic-view.component';
import {ClassicViewResolver} from '@services/classic-view/classic-view.resolver';
import {BaseMetadataResolver} from '@services/metadata/base-metadata.resolver';
import {AuthGuard} from '@services/auth/auth-guard.service';
import {ListComponent} from '@views/list/list.component';
import {LoginAuthGuard} from '@services/auth/login-auth-guard.service';
import {BaseListResolver} from '@services/metadata/base-list.resolver';
import {BaseModuleResolver} from '@base/services/metadata/base-module.resolver';
import {BaseRecordResolver} from '@services/metadata/base-record.resolver';
import {RecordComponent} from '@views/record/record.component';
import {RecordViewGuard} from '@services/record-view/record-view-guard.service';

/**
 * @param {[]} segments of url
 * @returns {object|null} matches
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function moduleMatcher(segments: UrlSegment[]): UrlMatchResult | null {

    const modules = [
        'aclroles',
        'aclactions',
        'prospectlists',
        'projecttask',
        'emailmarketing',
        'schedulersjobs',
        'emailtemplates',
        'documentrevisions',
        'inboundemail',
        'savedsearch',
        'userpreferences',
        'emailaddresses',
        'am_projecttemplates',
        'am_tasktemplates',
        'favorites',
        'reminders_invitees',
        'calls_reschedule',
        'securitygroups',
        'outboundemailaccounts',
        'templatesectionline',
        'calls',
        'calls-reschedule',
        'meetings',
        'tasks',
        'notes',
        'leads',
        'contacts',
        'accounts',
        'opportunities',
        'emails',
        'email-templates',
        'inbound-email',
        'mail-merge',
        'campaigns',
        'targets',
        'prospects',
        'prospect-lists',
        'documents',
        'cases',
        'project',
        'project-task',
        'bugs',
        'resource-calendar',
        'business-hours',
        'spots',
        'acl',
        'acl-roles',
        'acl-actions',
        'roles',
        'configurator',
        'user-preferences',
        'users',
        'employees',
        'eapm',
        'outbound-email-accounts',
        'template-section-line',
        'surveys',
        'survey-responses',
        'survey-question-responses',
        'survey-questions',
        'survey-question-options',
        'reminders',
        'reminders-invitees',
        'project-templates',
        'task-templates',
        'knowledge-base-categories',
        'knowledge-base',
        'events',
        'event-locations',
        'contracts',
        'invoices',
        'pdf-templates',
        'product-categories',
        'products',
        'quotes',
        'products-quotes',
        'line-item-groups',
        'maps',
        'markers',
        'areas',
        'address-cache',
        'case-events',
        'case-updates',
        'reports',
        'scheduled-reports',
        'report-fields',
        'report-charts',
        'report-conditions',
        'workflow',
        'workflow-actions',
        'workflow-processed',
        'workflow-conditions',
        'currencies',
        'trackers',
        'email-marketing',
        'email-addresses',
        'schedulers',
        'schedulers-jobs',
        'campaign-trackers',
        'campaign-log',
        'emailman',
        'groups',
        'document-revisions',
        'alerts',
        'my-settings',
        'alert',
    ];

    const action = [
        'index',
        'list',
    ];

    if (!segments || segments.length < 1) {
        return null;
    }

    let result = {
        consumed: segments,
        posParams: {}
    };

    const checks = [
        (segment: UrlSegment): boolean => modules.includes(segment.path),
        (segment: UrlSegment): boolean => action.includes(segment.path)
    ];

    const params = [
        'module',
        'action'
    ];

    segments.some((segment, index) => {
        if (!checks[index]) {
            return true; // no more segments to check
        }

        const matches = checks[index](segment);

        if (params[index] && result) {
            result.posParams[params[index]] = segment;
        }

        if (!matches) {
            result = null;
            return true;
        }
    });

    return result;
}

const routes: Routes = [
    {
        matcher: moduleMatcher,
        component: ListComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        resolve: {
            metadata: BaseListResolver
        },
        data: {
            reuseRoute: false,
            checkSession: true
        }
    },
    {
        path: ':module/list-new',
        component: ListComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        resolve: {
            view: BaseModuleResolver,
            metadata: BaseListResolver
        },
        data: {
            reuseRoute: false,
            checkSession: true
        }
    },
    {
        path: 'Login',
        loadChildren: () => import('../components/login/login.module').then(m => m.LoginUiModule),
        canActivate: [LoginAuthGuard],
        runGuardsAndResolvers: 'always',
        resolve: {
            metadata: BaseMetadataResolver
        },
        data: {
            reuseRoute: false,
            load: {
                navigation: false,
                preferences: false,
                languageStrings: ['appStrings']
            }
        }
    },
    {
        path: ':module',
        component: ClassicViewUiComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        resolve: {
            legacyUrl: ClassicViewResolver,
        },
        data: {
            reuseRoute: false,
            checkSession: true
        }
    },
    {
        path: ':module/:action',
        component: ClassicViewUiComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        resolve: {
            legacyUrl: ClassicViewResolver,
        },
        data: {
            reuseRoute: false,
            checkSession: true
        }
    },
    {
        path: ':module/:action/:record',
        component: RecordComponent,
        canActivate: [AuthGuard, RecordViewGuard],
        runGuardsAndResolvers: 'always',
        resolve: {
            view: BaseModuleResolver,
            metadata: BaseRecordResolver
        },
        data: {
            reuseRoute: false,
            checkSession: true
        }
    },
    {path: '**', redirectTo: 'Login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: true,
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
