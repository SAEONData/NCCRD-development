'use strict'

import React from 'react'
import { Button, Collapse } from 'mdbreact'
import { connect } from 'react-redux'
import { CLEAR_FILTERS } from "../constants/action-types"

//Filters
import GeneralFilters from './filters/GeneralFilters.jsx';
import RegionFilters from './filters/RegionFilters.jsx';
import SectorFilters from './filters/SectorFilters.jsx';


const mapStateToProps = (state, props) => {
    return { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearFilters: payload => {
            dispatch({ type: CLEAR_FILTERS, payload })
        }
    }
}

class ProjectFilters extends React.Component {

    constructor(props) {
        super(props);
        this.toggleGeneral = this.toggleGeneral.bind(this);
        this.toggleRegion = this.toggleRegion.bind(this);
        this.toggleSector = this.toggleSector.bind(this);
        this.clearFilters = this.clearFilters.bind(this)

        this.state = {
            collapseGeneral: false,
            collapseRegion: false,
            collapseSector: false,
        };
    }

    toggleGeneral() {
        this.setState({ collapseGeneral: !this.state.collapseGeneral });
    }

    toggleRegion() {
        this.setState({ collapseRegion: !this.state.collapseRegion });
    }

    toggleSector() {
        this.setState({ collapseSector: !this.state.collapseSector });
    }

    getBottonColor(state) {
        if (state === true) {
            return "warning"
        }
        else {
            return "primary"
        }
    }

    clearFilters() {

        let { clearFilters } = this.props
        clearFilters("")

        location.hash = "/"

    }

    render() {
        return (
            <div>

                <hr />

                <div className="row">
                    <div className="col-md-3">
                        <Button block color={this.getBottonColor(this.state.collapseGeneral)} className="btn-sm" onTouchTap={this.toggleGeneral}>General filters</Button>
                    </div>

                    <div className="col-md-3">
                        <Button block color={this.getBottonColor(this.state.collapseRegion)} className="btn-sm" onTouchTap={this.toggleRegion} >Region filters</Button>
                    </div>

                    <div className="col-md-3">
                        <Button block color={this.getBottonColor(this.state.collapseSector)} className="btn-sm" onTouchTap={this.toggleSector} >Sector filters</Button>
                    </div>

                    <div className="col-md-3">
                        <Button block color="secondary" className="btn-sm" onTouchTap={this.clearFilters} >
                            <i className="fa fa-eraser" aria-hidden="true"></i>&nbsp;&nbsp;Clear filters
                        </Button>
                    </div>
                </div>

                <hr />

                <Collapse isOpen={this.state.collapseGeneral} >
                    <GeneralFilters />
                    <hr />
                </Collapse>

                <Collapse isOpen={this.state.collapseRegion}>
                    <RegionFilters />
                    <hr />
                </Collapse>

                <Collapse isOpen={this.state.collapseSector}>
                    <SectorFilters />
                    <hr />
                </Collapse>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFilters)