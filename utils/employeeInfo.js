// fetch SOAP Employee Info
const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');

const employeeInfo = async username => {
  const url = 'https://idm.pea.co.th/webservices/EmployeeServices.asmx?wsdl';
  const Headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    soapAction: process.env.EMPLOYEE_INFO_SOAP_ACTION
  };

  const xml = `
  <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <GetEmployeeInfoByUsername xmlns="http://idm.pea.co.th/">
            <!-- Optional -->
            <request>
                <WSAuthenKey>${process.env.EMPLOYEE_INFO_KEY}</WSAuthenKey>
                <!-- Optional -->
                <InputObject>
                    <Username>${username}</Username>
                </InputObject>
            </request>
        </GetEmployeeInfoByUsername>
    </Body>
  </Envelope>`;

  try {
    const { response } = await soapRequest({
      url: url,
      headers: Headers,
      xml,
      timeout: 1000
    }); // Optional timeout parameter(milliseconds)

    const { headers, body, statusCode } = response;

    const options = {
      explicitArray: false,
      tagNameProcessors: [xml2js.processors.stripPrefix]
    };

    // parse to JSON object
    const xmlResult = await xml2js.parseStringPromise(body, options);

    const result =
      xmlResult.Envelope.Body.GetEmployeeInfoByUsernameResponse
        .GetEmployeeInfoByUsernameResult;

    let data = {};

    if (result.ResponseCode === 'EAM0001') {
      // หา user ไม่เจอ
      data.result = false;

      return data;
    } else if (result.ResponseCode === 'WSV0000') {
      // หา User เจอ
      data.result = true;

      // destructuring เอาเฉพาะข้อมูลที่ต้องการ
      const {
        Username,
        TitleFullName,
        FirstName,
        LastName,
        DepartmentSap,
        Email,
        NewOrganizationalCode,
        BaCode,
        Peacode,
        Peaname,
        Peaname1
      } = result.ResultObject;

      data.user = {
        employeeId: Username,
        titleFullName: TitleFullName,
        firstName: FirstName,
        lastName: LastName,
        departmentSap: DepartmentSap,
        email: Email,
        newOrganizationalCode: NewOrganizationalCode,
        baCode: BaCode,
        peaCode: Peacode,
        peaName: Peaname,
        peaFullName: Peaname1
      };

      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = employeeInfo;
