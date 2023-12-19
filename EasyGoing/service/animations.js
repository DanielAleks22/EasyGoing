export const forFadeAndScale = ({ current }) => {
  return {
      cardStyle: {
          opacity: current.progress,
          transform: [
              {
                  scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                      extrapolate: 'clamp',
                  })
              }
          ]
      }
  };
};