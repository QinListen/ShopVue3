import http from '@/utils/http'

export function loginApi({ account, password}) {
    return http({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}

