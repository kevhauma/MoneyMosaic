import { AccountSettingAtomEntry } from '@/feature-data-store/AccountSettingsAtom';
import { useAccounts } from '@/feature-data-store/useAccounts';
import { Button, Card, Flex, SimpleInput } from '@/libs/shadCn';

import { useState } from 'react';

export const AccountSettings = () => {
  const { getAccounts } = useAccounts();
  const accountSettings = getAccounts();
  return (
    <Card>
      {accountSettings.map((accountSetting) => (
        <AccountSetting setting={accountSetting} />
      ))}
    </Card>
  );
};

type AccountSettingProps = {
  setting: AccountSettingAtomEntry;
};

const AccountSetting = ({ setting }: AccountSettingProps) => {
  const { setSetting } = useAccounts();
  const [tempName, setTempName] = useState(setting.value.name);
  return (
    <Flex>
      <SimpleInput
        label={setting.key}
        value={tempName}
        onChange={setTempName}
      />
      <Button onClick={() => setSetting(setting.key, { name: tempName })}>
        Update
      </Button>
    </Flex>
  );
};
