const projectModel = require('../models/project');
const siteModel = require('../models/site');

const Uuid = require('cassandra-driver').types.Uuid;

const create = (req, res, next) => {
    if (req.body.name) {
        req.body.id = Uuid.random();
        return projectModel.create(req.body).then(() => {
            req.body.sites = req.body.sites || [];
            return projectModel.updateSites(req.body.sites, req.body.id).then(() => {
                return res.status(201).json({message: 'created.'});
            }).catch(err => {
                return res.status(400).json({message: err.message});
            });
        }).catch(err => {
                return res.status(400).json({message: err.message});
        });
    } else return res.status(400).json({message: 'Name is required'});
};

const getAll = (req, res, next) => {
    return projectModel.getAll().then(result => {
        const projects = [];
        const sitesRequests = [];
        result.rows.forEach(project => {
            sitesRequests.push(
                siteModel.getByProjectId(project.id).then(dataSites => {
                    projects.push({
                        id: project.id,
                        name: project.name,
                        sites: dataSites.rows
                    });
                }).catch(err => {
                    projects.push({
                        id: project.id,
                        name: project.name,
                        sites: []
                    });
                })
            );
        });
        if (sitesRequests.length) {
            return Promise.all(sitesRequests).then(results => {
                return res.status(200).json(projects);
            }).catch(err => {
                    return res.status(200).json(projects);
            });
        } else {
            return res.status(200).json([]);
        }
    }).catch(err => {
            return res.status(400).json({message: err.message});
    });
};

const getAvailableSites = (req, res, next) => {
    return projectModel.getAvailableSites(req.params.id).then(results => {
        let rows = [];
        results.forEach(result => {
            rows = rows.concat(result.rows);
        });
        return res.status(200).json(rows);
    }).catch(err => {
        return res.status(400).json({message: err.message});
    });
};

const updateProjectSites = (req, res, next) => {
    const id = req.body.id;
    if(id) {
        return projectModel.get({id: id}).then(result => {
            if (result && result.rows && result.rows[0]) {
                return projectModel.update(req.body).then(UpdatedUser => {
                    return siteModel.getByProjectId(id).then(sites => {
                        return projectModel.updateSites(sites.rows).then(() => {
                            return projectModel.updateSites(req.body.sites. id).then(() => {
                                return res.status(201).json({message: 'success.'});
                            }).catch(err => {
                                return res.status(202).json({message: err.message});
                            });
                        }).catch(err => {
                            return res.status(202).json({message: err.message});
                        });
                    }).catch(err => {
                        return res.status(202).json({message: err.message});
                    });
                });
            } else return res.status(202).json({error: 'Invalid user data.'}); 
        });
    }
};

const del = (req, res, next) => {
    id = req.query.id;
    if(id) {
        return projectModel.getById({id: id}).then(result => {
            if (result && result.rows && result.rows[0]) {
            return projectModel.delete(id).then(() => {
                return siteModel.getByProjectId(id).then(sites => {
                    return projectModel.updateSites(sites.rows).then(() => {
                        return res.status(201).json({message: 'success.'});
                    }).catch(err => {
                        return res.status(202).json({message: err.message});
                    });
                }).catch(err => {
                    return res.status(202).json({message: err.message});
                });
        }).catch(err => {
                return res.status(202).json({message: err.message});
            });
        } else return res.status(202).json({error: 'Invalid project data.'});
    });
    }
};

exports.create = create;
exports.getAll = getAll;
exports.updateProjectSites = updateProjectSites;
exports.del = del;
exports.getAvailableSites = getAvailableSites;