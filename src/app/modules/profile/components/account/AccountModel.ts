export interface IAccount {
  username: string
  email: string
  language: string
  timeZone: string
  communications: {
    email: boolean
    sms: boolean
    phone: boolean
  }
  requireInfo: boolean
}

export const defaultAccount: IAccount = {
  username: 'raihanhendraji',
  email: 'raihan.hendraji@student.pradita.ac.id',
  language: 'en',
  timeZone: 'Jakarta',
  communications: {
    email: false,
    sms: true,
    phone: false,
  },
  requireInfo: false,
}
