export default function globalInfoReducer() {
    return {
        accountingRoleTypes: [
            {
                label: '企业会计准则',
                value: 'option1',

            },
            {
                label: '小企业会计准则',
                value: 'option2',
            },
            {
                label: '民间非营利组织会计制度',
                value: 'option3',
            },
            {
                label: '事业单位会计制度',
                value: 'option4',
            },
            {
                label: '医院会计制度',
                value: 'option5',
            }
        ],
        accountingRoleYears: [
            {
                label: '2006',
                value: '2006',
            },
            {
                label: '2007',
                value: '2007',
            },
            {
                label: '2008',
                value: '2008',
            },
            {
                label: '2009',
                value: '2009',
            },
            {
                label: '2010',
                value: '2010',
            },
            {
                label: '2011',
                value: '2011',
            },
            {
                label: '2012',
                value: '2012',
            },
            {
                label: '2013',
                value: '2013',
            },
            {
                label: '2014',
                value: '2014',
            },
            {
                label: '2015',
                value: '2015',
            },
            {
                label: '2016',
                value: '2016',
            }
        ],
        accountingChannels: [
            {
                label: '准则',
                key: 'rules',
                icon: 'mail',
                selected: true
            },
            {
                label: '科目',
                key: 'subjects',
                icon: 'appstore',
                selected: false
            },
            {
                label: '报表',
                key: 'reports',
                icon: 'pay-circle',
                selected: false
            },
            {
                label: '行业',
                key: 'indus',
                icon: 'switcher',
                selected: false
            },
            {
                label: '解读',
                key: 'analysis',
                icon: 'tool',
                selected: false
            },
            {
                label: '分录',
                key: 'entries',
                icon: 'team',
                selected: false
            },
            {
                label: '实务',
                key: 'practice',
                icon: 'team',
                selected: false
            }
        ]
    }
}
