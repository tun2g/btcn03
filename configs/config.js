const db=require('./connectString')

const config= {
    isExist: async(id,table,key)=>{
        try {
            const rs = await db.any(`SELECT * FROM "${table}" WHERE "${key}" = $1`, [id]);
            return rs;
        } catch (err) {
            console.log(err)
            return "n"
        }
    }
}
module.exports=config