const pkg = require('./package.json');
module.exports = {
    apps: [{
        name: pkg.name,
        script: './scripts/server.js',
        exec_mode: 'cluster',
        max_memory_restart: '20480M',
        instances: 0, // 默认启CPU核数的进程
        error_file: '/dev/null',
        out_file: '/dev/null',
        merge_logs: true,
        min_uptime: '5s',
        cwd: './',
        instance_var: 'INSTANCE_ID',
        ignore_watch: [
            'node_modules',
        ],
    }]
}
