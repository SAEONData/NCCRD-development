import React from 'react'
import { Button, Fa } from 'mdbreact'
import { apiBaseURL } from "../../../constants/apiBaseURL"
import { connect } from 'react-redux'
import * as ACTION_TYPES from "../../../constants/action-types"
import MitigationDetailsItem from './MitigationDetailsItem.jsx'

const mapStateToProps = (state, props) => {
  let { mitigationData: { mitigationDetails } } = state
  let { projectData: { projectDetails } } = state
  let { globalData: { editMode } } = state
  return { mitigationDetails, editMode, projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MitigationDetailsTab extends React.Component {

  constructor(props) {
    super(props)
  }

  loadDetails() {

    let { mitigationDetails } = this.props
    let details = []

    if (typeof mitigationDetails !== 'undefined') {

      for (let i of mitigationDetails.sort((a, b) => parseInt(a.MitigationDetailId) - parseInt(b.MitigationDetailId))) {
        details.push(<MitigationDetailsItem key={i.MitigationDetailId} details={i} />)
      }

      return details
    }
    return <div />
  }

  render() {

    return (
      <>
        {this.loadDetails()}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MitigationDetailsTab)