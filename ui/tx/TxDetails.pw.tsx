import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';

import * as txMock from 'mocks/txs/tx';
import contextWithEnvs from 'playwright/fixtures/contextWithEnvs';
import TestApp from 'playwright/TestApp';
import buildApiUrl from 'playwright/utils/buildApiUrl';
import insertAdPlaceholder from 'playwright/utils/insertAdPlaceholder';

import TxDetails from './TxDetails';

const API_URL = buildApiUrl('tx', { hash: '1' });
const hooksConfig = {
  router: {
    query: { hash: 1 },
  },
};

test('between addresses +@mobile +@dark-mode', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.base),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await page.getByText('View details').click();
  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

test('creating contact', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.withContractCreation),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

test('with token transfer +@mobile', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.withTokenTransfer),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

test('with decoded revert reason', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.withDecodedRevertReason),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

test('with decoded raw reason', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.withRawRevertReason),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

test('pending', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.pending),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await page.getByText('View details').click();
  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

test('with actions uniswap +@mobile +@dark-mode', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.withActionsUniswap),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);
  await expect(component).toHaveScreenshot();
});

const l2Test = test.extend({
  context: contextWithEnvs([
    { name: 'NEXT_PUBLIC_IS_L2_NETWORK', value: 'true' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as any,
});

l2Test('l2', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.l2tx),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});

const mainnetTest = test.extend({
  context: contextWithEnvs([
    { name: 'NEXT_PUBLIC_IS_TESTNET', value: 'fals' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as any,
});

mainnetTest('without testnet warning', async({ mount, page }) => {
  await page.route(API_URL, (route) => route.fulfill({
    status: 200,
    body: JSON.stringify(txMock.l2tx),
  }));

  const component = await mount(
    <TestApp>
      <TxDetails/>
    </TestApp>,
    { hooksConfig },
  );

  await insertAdPlaceholder(page);

  await expect(component).toHaveScreenshot();
});
