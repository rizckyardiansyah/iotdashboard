import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  MixedWidget8,
  CardsWidget7,
  CardsWidget20,
} from '../../../_metronic/partials/widgets'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { Content } from '../../../_metronic/layout/components/content'

const DashboardPage: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
    {/* begin::Row */}
    <div className='row'>
      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10'>
        <CardsWidget20
          className=''
          description='Active Projects'
          color='#F1416C'
          img={toAbsoluteUrl('media/patterns/vector-1.png')}
        />
      </div>
      {/* end::Col */}
      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10'>
        <CardsWidget7
          className=''
          description='Professionals'
          icon={false}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row g-5 gx-xxl-8'>
      <div className='mb-md-5 mb-xl-10'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='600px'
        />
      </div>
    </div>
    {/* end::Row */}
    </Content>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
