import styled from "@emotion/styled";

export const Progressbar = ({ total, current, barStyle, style, ...props }) => {
  const percentage = Math.floor((current / total) * 100);
  const getWidth = () => {
    const styles = { ...barStyle };
    if (total && current) {
      styles.width = `${percentage}%`;
      if (percentage === 100) {
        styles.borderRadius = 100;
        styles.right = "-0.5px";
      }
    }
    return styles;
  };

  return (
    <Container {...props} style={style}>
      {percentage > 0 && <Progress style={getWidth()} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1.5px solid white;
  border-radius: 100px;
  height: 5px;
  width: auto;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 2;
`;
const Progress = styled.div`
  position: absolute;
  display: block;
  z-index: 1;
  left: -0.5px;
  top: -0.5px;
  bottom: -0.5px;
  border: 1px solid white;
  background-color: white;
  /* border-radius: 100px 0 0 100px; */
  border-radius: 100px;
`;
