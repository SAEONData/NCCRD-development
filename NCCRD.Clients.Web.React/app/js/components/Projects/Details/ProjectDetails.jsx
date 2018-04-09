'use strict'

import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact'
import { connect } from 'react-redux'
import EditListModal from './ListEditing/EditListModal.jsx'
import * as ACTION_TYPES from "../../../constants/action-types"
import { apiBaseURL } from "../../../constants/apiBaseURL"
import ProjectDetailsTab from './ProjectDetailsTab.jsx'
import AdaptationDetailsTab from './AdaptationDetailsTab.jsx'
import MitigationDetailsTab from './MitigationDetailsTab.jsx'
import MitigationEmissionsDataTab from './MitigationEmissionsDataTab.jsx'
import ResearchDetailsTab from './ResearchDetailsTab.jsx'
import RangeComponent from '../../Shared/RangeComponent.jsx'
import { BeatLoader } from 'react-spinners';

//react-tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const mapStateToProps = (state, props) => {

    let { projectData: { projectDetails } } = state
    let { adaptationData: { adaptationDetails } } = state
    let { mitigationData: { mitigationDetails } } = state
    let { emissionData: { emissionsData } } = state
    let { researchData: { researchDetails } } = state
    let { globalData: { loading, editMode, isAuthenticated } } = state

    let editListModalShow = state.editListModalData.show
    let editListModalItems = state.editListModalData.items

    return {
        projectDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails, editMode, loading, isAuthenticated,
        editListModalShow, editListModalItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProjectDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_DETAILS, payload })
        },
        loadAdaptationDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_ADAPTATION_DETAILS, payload })
        },
        loadMitigationDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_MITIGATION_DETAILS, payload })
        },
        loadMitigationEmissions: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_MITIGATION_EMISSIONS, payload })
        },
        loadResearchDetails: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_RESEARCH_DETAILS, payload })
        },
        setLoading: payload => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload })
        },
        setEditMode: payload => {
            dispatch({ type: ACTION_TYPES.SET_EDIT_MODE, payload })
        },
        loadProjectTypes: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_TYPE, payload })
        },
        loadProjectSubTypes: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_SUBTYPE, payload })
        },
        loadProjectStatus: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_PROJECT_STATUS, payload })
        },
        loadProjectManagers: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_USERS, payload })
        },
        loadValidationStatus: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_VALIDATION_STATUS, payload })
        },
        loadMAOptions: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_MA_OPTIONS, payload })
        },
        loadAdaptationPurpose: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_ADAPTATION_PURPOSE, payload })
        },
        loadSectors: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_SECTOR, payload })
        },
        loadCarbonCredit: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CARBON_CREDIT, payload })
        },
        loadCarbonCreditMarket: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CARBON_CREDIT_MARKET, payload })
        },
        loadCDMStatus: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CDM_STATUS, payload })
        },
        loadCDMMethodology: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_CDM_METHODOLOGY, payload })
        },
        loadVoluntaryMethodology: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_VOLUNTARY_METHODOLOGY, payload })
        },
        loadVoluntaryGoldStandard: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_VOLUNTARY_GOLD_STANDARD, payload })
        },
        loadResearchType: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_RESEARCH_TYPE, payload })
        },
        loadTargetAudience: payload => {
            dispatch({ type: ACTION_TYPES.LOAD_TARGET_AUDIENCE, payload })
        },
        resetProjectState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_PROJECT_STATE, payload })
        },
        resetAdaptationState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_ADAPTATION_STATE, payload })
        },
        resetMitigationState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_MITIGATION_STATE, payload })
        },
        resetEmissionState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_EMISSION_STATE, payload })
        },
        resetResearchState: payload => {
            dispatch({ type: ACTION_TYPES.RESET_RESEARCH_STATE, payload })
        }
    }
}

class ProjectDetails extends React.Component {

    constructor(props) {
        super(props)

        this.editClick = this.editClick.bind(this)
        this.saveClick = this.saveClick.bind(this)
        this.discardClick = this.discardClick.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.discardChanges = this.discardChanges.bind(this)
        this.backToList = this.backToList.bind(this)

        let projectId = this.props.match.params.id
        this.state = { ...this.state, projectId, discardModal: false, saveModal: false, navBack: false }
    }

    loadProjectType(loadProjectTypes) {
        return fetch(apiBaseURL + 'api/ProjectType/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectTypes(res)
        })
    }

    loadProjectSubType(loadProjectSubTypes) {
        return fetch(apiBaseURL + 'api/ProjectSubType/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectSubTypes(res)
        })
    }

    loadProjectStatus(loadProjectStatus) {
        return fetch(apiBaseURL + 'api/ProjectStatus/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectStatus(res)
        })
    }

    loadProjectManager(loadProjectManagers) {
        return fetch(apiBaseURL + 'api/AppUsr/GetAllBasic', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadProjectManagers(res)
        })
    }

    loadValidationStatus(loadValidationStatus) {
        return fetch(apiBaseURL + 'api/ValidationStatus/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadValidationStatus(res)
        })
    }

    loadMAOption(loadMAOptions) {
        return fetch(apiBaseURL + 'api/MAOptions/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadMAOptions(res)
        })
    }

    loadAdaptationPurpose(loadAdaptationPurpose) {
        return fetch(apiBaseURL + 'api/AdaptationPurpose/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadAdaptationPurpose(res)
        })
    }

    loadSector(loadSectors) {
        return fetch(apiBaseURL + 'api/Sector/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadSectors(res)
        })
    }

    loadCarbonCredit(loadCarbonCredit) {
        return fetch(apiBaseURL + 'api/CarbonCredit/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCarbonCredit(res)
        })
    }

    loadCarbonCreditMarket(loadCarbonCreditMarket) {
        return fetch(apiBaseURL + 'api/CarbonCreditMarket/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCarbonCreditMarket(res)
        })
    }

    loadCDMStatus(loadCDMStatus) {
        return fetch(apiBaseURL + 'api/CDMStatus/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCDMStatus(res)
        })
    }

    loadCDMMethodology(loadCDMMethodology) {
        return fetch(apiBaseURL + 'api/CDMMethodology/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadCDMMethodology(res)
        })
    }

    loadVoluntaryMethodology(loadVoluntaryMethodology) {
        return fetch(apiBaseURL + 'api/VoluntaryMethodology/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadVoluntaryMethodology(res)
        })
    }

    loadVoluntaryGoldStandard(loadVoluntaryGoldStandard) {
        return fetch(apiBaseURL + 'api/VoluntaryGoldStandard/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadVoluntaryGoldStandard(res)
        })
    }

    loadResearchType(loadResearchType) {
        return fetch(apiBaseURL + 'api/ResearchType/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadResearchType(res)
        })
    }

    loadTargetAudience(loadTargetAudience) {
        return fetch(apiBaseURL + 'api/TargetAudience/GetAll/', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            loadTargetAudience(res)
        })
    }

    loadProjects(loadProjectDetails) {

        let action

        if (this.state.projectId === 'add') {

            let newProject = {
                "ProjectId": Date().valueOf(),
                "ProjectTitle": "",
                "ProjectDescription": "",
                "LeadAgent": "",
                "HostPartner": "",
                "HostOrganisation": "",
                "StartYear": 0,
                "EndYear": 0,
                "AlternativeContact": "",
                "AlternativeContactEmail": "",
                "Link": "string",
                "ValidationComments": "",
                "BudgetLower": 0,
                "BudgetUpper": 0,
                "ProjectTypeId": 0,
                "ProjectSubTypeId": 0,
                "ProjectStatusId": 0,
                "ProjectManagerId": 0,
                "ValidationStatusId": 0,
                "MAOptionId": 0,
                "state": "modified"
            }

            action = loadProjectDetails(newProject)
        }
        else {
            action = fetch(apiBaseURL + 'api/Projects/GetById/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.state = "original"
                loadProjectDetails(res)
            })
        }

        return action
    }

    loadAdaptationDetails(loadAdaptationDetails) {

        let action

        if (this.state.projectId === 'add') {
            action = loadAdaptationDetails([])
        }
        else {
            action = fetch(apiBaseURL + 'api/AdaptationDetails/GetByProjectId/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadAdaptationDetails(res)
            })
        }

        return action
    }

    loadMitigationDetails(loadMitigationDetails) {

        let action

        if (this.state.projectId === 'add') {
            action = loadMitigationDetails([])
        }
        else {
            action = fetch(apiBaseURL + 'api/MitigationDetails/GetByProjectId/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadMitigationDetails(res)
            })
        }

        return action
    }

    loadMitigationEmissionsData(loadMitigationEmissions) {

        let action

        if (this.state.projectId === 'add') {
            action = loadMitigationEmissions([])
        }
        else {
            action = fetch(apiBaseURL + 'api/MitigationEmissionsData/GetByProjectID//' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadMitigationEmissions(res)
            })
        }

        return action
    }

    loadResearchDetails(loadResearchDetails) {

        let action

        if (this.state.projectId === 'add') {
            action = loadResearchDetails([])
        }
        else {
            action = fetch(apiBaseURL + 'api/ResearchDetails/GetByProjectId/' + this.state.projectId, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(res => {
                res.map((x) => { x.state = "original" })
                loadResearchDetails(res)
            })
        }

        return action
    }

    loadData() {

        let { setLoading, setEditMode, projectDetails, loadProjectTypes, loadProjectSubTypes, loadProjectStatus, loadProjectManagers, loadValidationStatus,
            loadProjectDetails, loadAdaptationDetails, loadMitigationDetails, loadMAOptions,
            loadMitigationEmissions, loadResearchDetails, loadAdaptationPurpose, loadSectors, loadCarbonCredit,
            loadCarbonCreditMarket, loadCDMStatus, loadCDMMethodology, loadVoluntaryMethodology, loadVoluntaryGoldStandard,
            loadResearchType, loadTargetAudience } = this.props

        setLoading(true)

        Promise.all([
            this.loadProjectType(loadProjectTypes),
            this.loadProjectSubType(loadProjectSubTypes),
            this.loadProjectStatus(loadProjectStatus),
            this.loadProjectManager(loadProjectManagers),
            this.loadValidationStatus(loadValidationStatus),
            this.loadMAOption(loadMAOptions),
            this.loadProjects(loadProjectDetails),
            this.loadAdaptationDetails(loadAdaptationDetails),
            this.loadMitigationDetails(loadMitigationDetails),
            this.loadMitigationEmissionsData(loadMitigationEmissions),
            this.loadResearchDetails(loadResearchDetails),
            this.loadAdaptationPurpose(loadAdaptationPurpose),
            this.loadSector(loadSectors),
            this.loadCarbonCredit(loadCarbonCredit),
            this.loadCarbonCreditMarket(loadCarbonCreditMarket),
            this.loadCDMStatus(loadCDMStatus),
            this.loadCDMMethodology(loadCDMMethodology),
            this.loadVoluntaryMethodology(loadVoluntaryMethodology),
            this.loadVoluntaryGoldStandard(loadVoluntaryGoldStandard),
            this.loadResearchType(loadResearchType),
            this.loadTargetAudience(loadTargetAudience)
        ])
        .then(() => {
            setLoading(false)
            if (this.state.projectId === 'add') {
                setEditMode(true)
            }
        })
        .catch(res => {
            setLoading(false)
            console.log("Error details:", res)
            alert("An error occurred while trying to fetch data from the server. Please try again later. (See log for error details)")
        })
    }

    componentDidMount() {
        this.loadData()
    }

    editClick() {

        //Will require access right in the future...

        let { setEditMode } = this.props
        setEditMode(true)
    }

    saveClick() {
        this.setState({ saveModal: true })
    }

    saveChanges() {

        let { setEditMode, setLoading } = this.props

        //Close modal
        this.setState({ saveModal: false })

        //Save changes to DB
        setLoading(true)

        Promise.all([
            this.SaveProjectChanges(),
            this.SaveAdaptationChanges(),
            this.SaveMitigationChanges(),
            this.SaveEmissionsChanges(),
            this.SaveResearchChanges()
        ]).then(([project, adaptations, mitigations, emissions, research]) => {

            //console.log("project: ", project)
            //console.log("adaptations: ", adaptations)
            //console.log("mitigations: ", mitigations)
            //console.log("emissions: ", emissions)
            //console.log("research: ", research)

            if (project === true && adaptations === true && mitigations === true && emissions === true && research === true) {
                setEditMode(false)
            }
            else if (project === false) {
                alert("Unable to save project data. See log for errors.")
                console.log('Error:', res)
            }
            else if (adaptations === false) {
                alert("Unable to save adaptation data. See log for errors.")
                console.log('Error:', res)
            }
            else if (mitigations === false) {
                alert("Unable to save mitigation data. See log for errors.")
                console.log('Error:', res)
            }
            else if (emissions === false) {
                alert("Unable to save emissions data. See log for errors.")
                console.log('Error:', res)
            }
            else if (research === false) {
                alert("Unable to save research data. See log for errors.")
                console.log('Error:', res)
            }

            setLoading(false)
        })
    }

    SaveProjectChanges() {

        let { projectDetails, resetProjectState } = this.props

        if (projectDetails.state === 'modified') {

            //Validate data...

            //Corrections

            let strPostData = JSON.stringify(projectDetails)
            let url = apiBaseURL + "api/Projects/AddOrUpdate"

            return fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: strPostData
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res === true) {
                        resetProjectState(projectDetails)
                    }

                    return res
                })
        }
        else {
            return true
        }
    }

    SaveAdaptationChanges() {

        let { adaptationDetails, resetAdaptationState } = this.props
        let result = true
        let actions = []

        return Promise.all(
            adaptationDetails.map((adaptation) => {

                if (adaptation.state === "modified") {

                    //Validate data...

                    let strPostData = JSON.stringify(adaptation)
                    let url = apiBaseURL + "api/AdaptationDetails/AddOrUpdate"

                    fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (result === true && res === false) {
                                result === false
                            }
                            else if (res === true) {
                                resetAdaptationState(adaptation)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    SaveMitigationChanges() {

        let { mitigationDetails, resetMitigationState } = this.props
        let result = true
        let actions = []

        return Promise.all(
            mitigationDetails.map((mitigation) => {

                if (mitigation.state === "modified") {

                    //Validate data...

                    let strPostData = JSON.stringify(mitigation)
                    let url = apiBaseURL + "api/MitigationDetails/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (result === true && res === false) {
                                result === false
                            }
                            else if (res === true) {
                                resetMitigationState(mitigation)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    SaveEmissionsChanges() {

        let { emissionsData, resetEmissionState } = this.props
        let result = true
        let actions = []

        return Promise.all(
            emissionsData.map((emission) => {

                if (emission.state === "modified") {

                    //Validate data...

                    let strPostData = JSON.stringify(emission)
                    let url = apiBaseURL + "api/MitigationEmissionsData/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (result === true && res === false) {
                                result === false
                            }
                            else if (res === true) {
                                resetEmissionState(emission)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    SaveResearchChanges() {

        let { researchDetails, resetResearchState } = this.props
        let result = true
        let actions = []

        return Promise.all(
            researchDetails.map((research) => {

                if (research.state === "modified") {

                    //Validate data...

                    let strPostData = JSON.stringify(research)
                    let url = apiBaseURL + "api/ResearchDetails/AddOrUpdate"

                    return fetch(url, {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: strPostData
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (result === true && res === false) {
                                result === false
                            }
                            else if (res === true) {
                                resetResearchState(research)
                            }
                        })
                }
            })
        ).then(() => {
            return result
        })
    }

    discardClick() {
        this.setState({ discardModal: true })
    }

    discardChanges() {

        let { setEditMode, projectDetails } = this.props

        this.setState({ discardModal: false })
        setEditMode(false)

        if (this.state.navBack === true) {
            this.navBack()
        }
        else {
            //Re-load data - discarding changes
            this.loadData()
        }
    }

    navBack() {
        this.props.setLoading(true)
        location.hash = "/projects"
    }

    backToList() {

        let { projectDetails, adaptationDetails, mitigationDetails, emissionsData, researchDetails } = this.props
        let dataState = "original"

        if (projectDetails.state !== 'original') {
            dataState = projectDetails.state
        }

        let arraySources = [adaptationDetails, mitigationDetails, emissionsData, researchDetails]
        arraySources.map((source) => {
            if (dataState === "original") {
                source.map((item) => {
                    if (item.state !== 'original') {
                        dataState = item.state
                    }
                })
            }
        })

        if (dataState === "original") {
            this.navBack()
        }
        else {
            this.setState({ navBack: true })
            this.discardClick()
        }
    }

    render() {

        const { projectDetails, editMode, isAuthenticated, editListModalShow, editListModalItems } = this.props

        return (

            <div>

                <div
                    hidden={!this.props.loading}
                    className="card"
                    style={{ position: "fixed", right: "40%", bottom: "42%", zIndex: "99", background: "white" }}>

                    <div className="card-body" style={{ margin: "30px 80px 30px 80px" }}>
                        <label style={{ fontSize: "x-large", fontWeight: "bold", color: "#4285F4" }}>LOADING</label>
                        <BeatLoader
                            color={'#4285F4'}
                            size={30}
                            loading={this.props.loading}
                        />
                    </div>
                </div>

                <br />
                <div className="row">

                    <div className="col-md-9">
                        <table >
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <Button style={{ width: "100px", marginTop: "3px" }} color="secondary" size="sm" id="btnBackToList" onTouchTap={this.backToList}>
                                            <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>&nbsp;&nbsp;Back
                                        </Button>
                                    </td>
                                    <td>
                                        <p style={{ fontSize: "x-large" }}><b>Project Title: </b>{projectDetails.ProjectTitle}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <RangeComponent
                        col="col-md-3"
                        align="center"
                        size="x-large"
                        id="txtYear"
                        label=""
                        inputWidth="75px"
                        valueFrom={projectDetails.StartYear} valueTo={projectDetails.EndYear}
                        setValueFromKey={ACTION_TYPES.SET_PROJECT_DETAILS_YEAR_FROM}
                        setValueToKey={ACTION_TYPES.SET_PROJECT_DETAILS_YEAR_TO}
                    />
                </div>

                <br />

                <Tabs forceRenderTabPanel={true}>
                    <TabList>
                        <Tab><b style={{ color: "#1565c0" }}>Project Details</b></Tab>
                        <Tab><b style={{ color: "#1565c0" }}>Adaptation Details</b></Tab>
                        <Tab><b style={{ color: "#1565c0" }}>Mitigation Details</b></Tab>
                        <Tab><b style={{ color: "#1565c0" }}>Mitigation Emissions Data</b></Tab>
                        <Tab><b style={{ color: "#1565c0" }}>Research Details</b></Tab>
                    </TabList>

                    <TabPanel>
                        <ProjectDetailsTab />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <AdaptationDetailsTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <MitigationDetailsTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <MitigationEmissionsDataTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                    <TabPanel>
                        <ResearchDetailsTab projectId={projectDetails.ProjectId} />
                        <br />
                        <br />
                        <br />
                    </TabPanel>
                </Tabs>

                <div className="container-fluid" hidden={!isAuthenticated}>
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ position: "fixed", right: "14%", bottom: "10px", zIndex: "99" }}>
                                <Button hidden={editMode} style={{ width: "125px" }} color="secondary" className="btn-sm" onTouchTap={this.editClick} >
                                    <i className="fa fa-pencil" aria-hidden="true" />
                                    &nbsp;&nbsp;
                                    Edit
                                </Button>
                                <Button hidden={!editMode} style={{ width: "125px" }} color="secondary" className="btn-sm" onTouchTap={this.saveClick} >
                                    <i className="fa fa-save" aria-hidden="true" />
                                    &nbsp;&nbsp;
                                    Save
                                </Button>
                                <Button hidden={!editMode} style={{ width: "125px" }} color="secondary" className="btn-sm" onTouchTap={this.discardClick} >
                                    <i className="fa fa-trash-o" aria-hidden="true" />
                                    &nbsp;&nbsp;
                                    Discard
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.discardModal}>
                    <ModalHeader toggle={this.toggle}>Confirm Discard</ModalHeader>
                    <ModalBody>
                        Are you sure you want to discard all changes?
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ discardModal: false })} >Cancel</Button>{' '}
                        <Button size="sm" style={{ width: "100px" }} color="primary" onClick={this.discardChanges} >Discard</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.saveModal}>
                    <ModalHeader toggle={this.toggle}>Confirm Save</ModalHeader>
                    <ModalBody>
                        Are you sure you want to save all changes?
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" style={{ width: "100px" }} color="secondary" onClick={() => this.setState({ saveModal: false })} >Cancel</Button>{' '}
                        <Button size="sm" style={{ width: "100px" }} color="warning" onClick={this.saveChanges} >Save</Button>
                    </ModalFooter>
                </Modal>

                <EditListModal />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)