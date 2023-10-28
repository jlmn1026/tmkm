import CommonContainer from '@/common-ui/CommonContainer';
import { SubTitle } from '@/common-ui/Title';
import { styled } from '@stitches/react';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

const InputFromJSONPage = () => {
  return (
    <CommonContainer>
      <SubTitle>Input Deck From JSON</SubTitle>
      <DraggerArea>
        <Dragger
          name="file"
          multiple={false}
          style={{
            color: '#fff',
          }}
          onChange={(info) => {
            const { status } = info.file;

            console.log(info.file);

            if (status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <DandDText>Click or drag json file to this area to upload</DandDText>
        </Dragger>
      </DraggerArea>
    </CommonContainer>
  );
};

export default InputFromJSONPage;

const DraggerArea = styled('div', {
  margin: '24px 0px',
  height: '200px',
});

const DandDText = styled('p', {
  color: '#fff',
  fontSize: '24px',
});
