source .env
sequelize-auto -h $DEV_DB_HOST \
-d $DEV_DB_NAME -u $DEV_DB_USER -x $DEV_DB_PASSWORD -p $DEV_DB_PORT \
--dialect mssql -o "./database/models"