/**
 * Created by TBS on 09/05/2017.
 */
var linkUserGroupController = require('./../controllers').linkUserGroup

var linkUserGroupRouters = function linkUserLinkUserGroupRouters(router) {
    router.route('/getinvites/:user_id')
        .get(function(req, res) {
            // params = req.query.filter ? JSON.parse(req.query.filter) : {};
            return linkUserGroupController.getPendingInvitesFromUser(req.params, function(err, linkUserGroups) {
                if (err) return res.status(500).send(err)
                else {
                    res.status(200).send(linkUserGroups)
                }
            })
        });

    router.route('/acceptinvite')
        .put(function(req, res) {
            if (req.body.isAccepted === true && req.body.isPending === false) {
                return linkUserGroupController.acceptLinkUserGroup(req.body, function(err, updatedLinkUserGroup) {
                    if (err) return res.status(500).send(err);
                    else {
                        res.status(200).send(updatedLinkUserGroup);
                    }
                })

            }
            else {
                return res.status(400).send('Bad request : veuillez renseigner les bon champs');
            }
        });
    
    router.route('/refuseinvite')
        //ici on veut req.body : { isAccepted: false, isPending: false, group: '123', user: '456' }
        .put(function(req, res) {
            if (req.body.isAccepted === false && req.body.isPending === false) {
                return linkUserGroupController.removeLinkUserGroup(req.body, function(err, updatedLinkUserGroup) {
                    if (err) return res.status(500).send(err);
                    else {
                        res.status(200).send(updatedLinkUserGroup);
                    }
                })

            }
            else {
                return res.status(400).send('Bad request : veuillez renseigner les bon champs');
            }
        });
    
}

module.exports = linkUserGroupRouters;