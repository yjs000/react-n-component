import {Field, FieldWrapper, Form, FormElement} from "@progress/kendo-react-form";
import {Input} from "@progress/kendo-react-inputs";
import axios from "@/api/axiso"
import {JSEncrypt} from "jsencrypt";
import useAuth from "@/hooks/useAuth.jsx";
import {setCookie} from "@/cmmn.js";
import {Link, Navigate, useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const {auth, setAuth} = useAuth();
    const handleSubmit = async (dataItem) => {
        // id: jisu
        // pw : !1234qwer
        console.log(dataItem);
        const res = await axios.post("/public-key");
        console.log("publicKey", res)
        const encrypt = new JSEncrypt();

        //암호화
        encrypt.setPublicKey(res?.data?.publicKey ?? "");
        const encryptPw = encrypt.encrypt(dataItem?.pw);

        const loginRes = await axios.post("/login", {id: dataItem.id, password: encryptPw})
        console.log("loginRes", loginRes);
        const data = loginRes.item;
        if(loginRes?.data?.status == 200 || loginRes?.data?.status == 201 /*토큰 만료시 서버에서 재요청된 토큰*/) {
            const _auth = loginRes.data.item.token;
            setAuth(_auth);
            setCookie("token", _auth, {maxAge: loginRes.data.item.expireSec ?? 0});
            return navigate("/main");
        } else {
            console.log(loginRes);
            alert("로그인 실패!");
        }
    };

    return (
        auth ? <h1>이미 로그인 되어있습니다. <Link to={"/"}>home</Link> </h1> :
        <div>
            <Form
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                    <FormElement
                        style={{
                            maxWidth: 650,
                        }}
                    >
                        <fieldset className={"k-form-fieldset"}>
                            <legend className={"k-form-legend"}>
                                login
                            </legend>
                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={"id"}
                                        component={Input}
                                        labelClassName={"k-form-label"}
                                        label={"아이디"}
                                    />
                                </div>
                            </FieldWrapper>

                            <FieldWrapper>
                                <div className="k-form-field-wrap">
                                    <Field
                                        name={"pw"}
                                        component={Input}
                                        labelClassName={"k-form-label"}
                                        label={"비밀번호"}
                                    />
                                </div>
                            </FieldWrapper>
                        </fieldset>

                        <div className="k-form-buttons">
                            <button
                                type={"submit"}
                                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                disabled={!formRenderProps.allowSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </FormElement>
                )}
            />
        </div>

    );
};

export default Login;
