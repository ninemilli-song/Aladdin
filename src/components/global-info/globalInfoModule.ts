export default function globalInfoReducer() {
    return {
        accountingChannels: [
            {
                label: '准则',
                key: 'rules',
                icon: 'mail',
            },
            {
                label: '科目',
                key: 'subjects',
                icon: 'appstore',
            },
            {
                label: '报表',
                key: 'reports',
                icon: 'pay-circle',
            },
            {
                label: '行业',
                key: 'indus',
                icon: 'switcher',
            },
            {
                label: '解读',
                key: 'analysis',
                icon: 'tool',
            },
            {
                label: '分录',
                key: 'entries',
                icon: 'team',
            },
            {
                label: '实务',
                key: 'practice',
                icon: 'team',
            }
        ]
    }
}
