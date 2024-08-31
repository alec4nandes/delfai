(Get-Content src/database.js) -replace 'db-dev.mjs', 'db-prod.mjs' | Out-File -encoding ASCII src/database.js
(Get-Content src/database.js) -replace 'IS_DEVELOPMENT = true', 'IS_DEVELOPMENT = false' | Out-File -encoding ASCII src/database.js
(Get-Content deploy/scripts/add-events.js) -replace 'IS_DEVELOPMENT = true', 'IS_DEVELOPMENT = false' | Out-File -encoding ASCII deploy/scripts/add-events.js
(Get-Content deploy/scripts/verify-age-location.js) -replace 'IS_DEVELOPMENT = true', 'IS_DEVELOPMENT = false' | Out-File -encoding ASCII deploy/scripts/verify-age-location.js
npm run build-deploy
(Get-Content deploy/scripts/verify-age-location.js) -replace 'IS_DEVELOPMENT = false', 'IS_DEVELOPMENT = true' | Out-File -encoding ASCII deploy/scripts/verify-age-location.js
(Get-Content deploy/scripts/add-events.js) -replace 'IS_DEVELOPMENT = false', 'IS_DEVELOPMENT = true' | Out-File -encoding ASCII deploy/scripts/add-events.js
(Get-Content src/database.js) -replace 'IS_DEVELOPMENT = false', 'IS_DEVELOPMENT = true' | Out-File -encoding ASCII src/database.js
(Get-Content src/database.js) -replace 'db-prod.mjs', 'db-dev.mjs' | Out-File -encoding ASCII src/database.js
