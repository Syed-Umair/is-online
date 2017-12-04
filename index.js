'use strict';

const got = require('got');
const publicIp = require('public-ip');
const pAny = require('p-any');
const pTimeout = require('p-timeout');

const defaults = {
	timeout: 5000,
	version: 'v4'
};

module.exports = options => {
	options = Object.assign({}, defaults, options);

	const p = pAny([
		publicIp[options.version]({https: true}).then(() => true)
	]);

	return pTimeout(p, options.timeout).catch(() => false);
};
