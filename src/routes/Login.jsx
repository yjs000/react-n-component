import {Field, FieldWrapper, Form, FormElement} from "@progress/kendo-react-form";
import {Input} from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import axios from "@/api/axiso"
import {JSEncrypt} from "jsencrypt";
const Login = () => {
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
    };

    return (
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
