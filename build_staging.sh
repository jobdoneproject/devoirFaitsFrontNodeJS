#!/bin/sh
echo "-- BEGINNING STAGING CUSTOM BUILD SCRIPT EXECUTION FOR DEVOIRSFAITS --"
echo "-- ->npm ng build --configuration=staging"
ng build --configuration=staging --base-href=/
echo "-- END npm ng build --configuration=staging --"
echo "-- END STAGING CUSTOM BUILD SCRIPT EXECUTION FOR DEVOIRSFAITS --"

