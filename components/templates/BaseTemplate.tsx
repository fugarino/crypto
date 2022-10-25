interface IBaseTemplate {
  sampleProp: any;
}

const BaseTemplate = ({ sampleProp }: IBaseTemplate) => {
  return <div>{sampleProp}</div>;
};

export default BaseTemplate;
