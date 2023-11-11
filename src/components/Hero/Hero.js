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
        <SectionText>A skilled full-stack developer with a passion for user-centric designs and a proven track record of delivering top-notch digital solutions.
        </SectionText>
        <Button onClick={props.handleClick} href="mailto:bright.bediako.dev@gmail.com">Contact Me</Button>
      </LeftSection>
    </Section>
  </>
);

export default Hero;