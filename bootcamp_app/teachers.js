const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'letmein',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv.slice(2)[0];

pool.query(`
SELECT DISTINCT 
  teachers.name as teacher, 
  cohorts.name as cohort, 
  COUNT(assistance_requests.id)
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${cohortName}'
GROUP BY teacher, cohort
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(teacherAssistance => {
    console.log(`${teacherAssistance.cohort}: ${teacherAssistance.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));
