// Setup for using Babel as Transpiler

require('@babel/register')({
	presets: ['@babel/env']
});

require('./app');
