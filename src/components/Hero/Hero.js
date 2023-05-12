import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';


const Hero = (props) => (
  <>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle main center>
          Hi, I'm<br />
          Bright Bediako
        </SectionTitle>
        <SectionText>
          Transform your online presence with an innovative solution's developer who delivers seamless, high-performing, and secure digital experiences.
        </SectionText>
        <Button onClick={props.handleClick} href="mailto:bright.bediako.dev@gmail.com">Contact Me</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;