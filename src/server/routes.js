module.exports = [
	"about",
	"account",
	"administration",
	"calendar",
	"community",
	"content",
	"coursegroups",
	"courses",
	"dashboard",
	"files",
	"firstLogin",
	"help",
	"helpdesk",
	"homework",
	"files",
	{
		route: "impressum",
		controller: "imprint",
	},
	"index",
	"link",
	"logs",
	"my-material",
	"news",
	"notification",
	"partner",
	"pwrecovery",
	"rocketChat",
	"schools",
	"team",
	{
		route: "teams",
		controller: "teams",
		routesExcluded: ["/:teamId/members"],
	},
	"tools",
	"topics",
	"users",
	"welcome",
];