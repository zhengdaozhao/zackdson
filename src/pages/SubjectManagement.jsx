import UserService from "../util/userService";
import { useLoaderData,Form} from "react-router-dom";
import { useState } from "react";

const SubjectManagement = () => {
    const {subjects} = useLoaderData();
    // const [branchs,setBranchs]=useState([]);
    const [subRadio,setSubRadio]=useState();
    const [ganguo,setganguo]=useState([]);
    const [xiaoguo,setXiaoguo]=useState([]);
    const [submittale,setSumittale]=useState(false);
    // console.log(subjects);

    const hadleRadioSelect = (value) => {
        async function httpRequestForBranchs(val) {
            try{
                const guoaili=await UserService.getOneSubject(val);
                if (uoaili.data.allsub) {
                    const abc=await JSON.parse(guoaili.data.allsub);
                    setganguo(abc);
                }
            }
            catch (ex) {
                alert("查询主科目表异常error!"+ex);
            }
            try{
                const resBranchs=await UserService.getAllBranchs();
                let zhongguo=await resBranchs.data;
                if (ganguo.length){
                    ganguo.forEach(aili=>
                        {zhongguo=zhonguo.filter(abc=>abc.name!==aili.name)}
                    )
                    setXiaoguo(zhongguo);
                }else{
                    setXiaoguo(zhongguo);
                }
            }
            catch (ex) {
                alert("error!",ex);
            }
        }
        httpRequestForBranchs(value);
    }
    return (
        <>
            <h1 style={{color:'red'}}>
                学科增减管理
            </h1>
            <h2>主学科</h2>
            {subjects.length ? (
                <Form>
                <ul>
                    {subjects.map(sub=> (
                        <li key={sub.name} >
                            <input 
                                type="radio"
                                id={sub.name}
                                name="subject"
                                value={sub.chname}
                                onChange={e=>hadleRadioSelect(e.target.value)}
                                 />
                            <label>
                                {sub.chname}
                            </label>
                        </li>
                    ))}
                    <li key="other" >
                            <input 
                                type="radio"
                                id="other"
                                name="subject"
                                value="other"
                                 />
                            <label>
                                其他(自定义)
                            </label>
                    </li>
                </ul>
                <hr />
                <h2>内容分类</h2>
                {xiaoguo.length ?  
                    <ul>
                        {xiaoguo.map( sub => (
                            <li>
                                <input 
                                    type="checkbox"
                                    id={sub.name}
                                    name={sub.name}
                                    value={sub.name}
                                    />
                                <label>
                                    {sub.chname}
                                </label>
                            </li>
                        )

                        )}
                    </ul>
                : 
                (<p>这里是二级分类,在科目选定后会显示</p>)
                }
                <button itemType="submit" disabled >提交</button>
                </Form>
            ) :
                <p>
                    数据库中没有任何初始化用数据,请联系管理员。
                </p>
            }
        </>
    );
}
export default SubjectManagement;

export async function loader(){
    const restData = await UserService.getAllSubjects();
    const subjects = await restData.data;
    // console.log(subjects);
    return {subjects};
}