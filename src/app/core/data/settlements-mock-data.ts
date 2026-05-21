import {EntryDirection} from '@core/models/entry-direction.enum';
import {EntryStatus} from '@core/models/entry-status.enum';
import {EntryType} from '@core/models/entry-type.enum';
import {GroupColor} from '@core/models/group-color.enum';
import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {InstallmentStatus} from '@core/models/installment-status.enum';
import {Installment} from '@core/models/installment.interface';
import {SettlementEntry} from '@core/models/settlement-entry.interface';
import {SettlementGroup} from '@core/models/settlement-group.interface';

const GROUP_FRIENDS_ID = 'group-friends';
const GROUP_FAMILY_ID = 'group-family';
const GROUP_BUSINESS_ID = 'group-business';

function createSingleInstallment(
  entryId: string,
  amount: number,
  dueDate: string,
  status: InstallmentStatus,
  paidAt?: string
): Installment {
  return {
    id: `${entryId}-inst-1`,
    index: 1,
    amount,
    plannedDueDate: dueDate,
    dueDate,
    status,
    paidAt,
    paymentMethod: status === InstallmentStatus.PAID ? 'Przelew' : undefined,
  };
}

function createFamilyInstallments(entryId: string): Installment[] {
  const months: string[] = [
    '2025-12-01',
    '2026-01-01',
    '2026-02-01',
    '2026-03-01',
    '2026-04-01',
    '2026-05-01',
    '2026-06-01',
    '2026-07-01',
    '2026-08-01',
    '2026-09-01',
    '2026-10-01',
    '2026-11-01',
  ];
  const paidDates: string[] = [
    '2025-12-05',
    '2026-01-03',
    '2026-02-02',
    '2026-03-01',
    '2026-04-04',
    '2026-05-02',
  ];

  return months.map((dueDate, index) => {
    const isPaid: boolean = index < 6;
    return {
      id: `${entryId}-inst-${index + 1}`,
      index: index + 1,
      amount: 250,
      plannedDueDate: dueDate,
      dueDate,
      status: isPaid ? InstallmentStatus.PAID : InstallmentStatus.UNPAID,
      paidAt: isPaid ? paidDates[index] : undefined,
      paymentMethod: isPaid ? 'Przelew' : undefined,
      note: index === 0 ? 'Pierwsza rata' : undefined,
    };
  });
}

export const INITIAL_SETTLEMENT_GROUPS: SettlementGroup[] = [
  {
    id: GROUP_FRIENDS_ID,
    name: 'Znajomi',
    color: GroupColor.BLUE,
    entries: [
      {
        id: 'entry-tomek',
        groupId: GROUP_FRIENDS_ID,
        personName: 'Tomek Brański',
        description: "Bilet na Impact'23",
        date: '2025-05-08',
        totalAmount: 200,
        type: EntryType.DEBT,
        status: EntryStatus.OVERDUE,
        installments: [
          createSingleInstallment('entry-tomek', 200, '2025-05-08', InstallmentStatus.UNPAID),
        ],
      },
      {
        id: 'entry-anna',
        groupId: GROUP_FRIENDS_ID,
        personName: 'Anna Wiśniewska',
        description: 'Kolacja urodzinowa',
        date: '2025-05-02',
        totalAmount: 120.5,
        type: EntryType.RECEIVABLE,
        status: EntryStatus.OVERDUE,
        installments: [
          createSingleInstallment('entry-anna', 120.5, '2025-05-02', InstallmentStatus.UNPAID),
        ],
      },
      {
        id: 'entry-marek',
        groupId: GROUP_FRIENDS_ID,
        personName: 'Marek Kowalczyk',
        description: 'Wakacje Chorwacja 2025',
        date: '2025-04-20',
        totalAmount: 1400,
        type: EntryType.RECEIVABLE,
        status: EntryStatus.OVERDUE,
        installments: [
          {
            id: 'entry-marek-inst-1',
            index: 1,
            amount: 700,
            plannedDueDate: '2025-06-01',
            dueDate: '2025-06-01',
            status: InstallmentStatus.UNPAID,
          },
          {
            id: 'entry-marek-inst-2',
            index: 2,
            amount: 700,
            plannedDueDate: '2025-08-01',
            dueDate: '2025-08-01',
            status: InstallmentStatus.UNPAID,
          },
        ],
      },
    ],
  },
  {
    id: GROUP_FAMILY_ID,
    name: 'Rodzina',
    color: GroupColor.GREEN,
    entries: [
      {
        id: 'entry-rodzice',
        groupId: GROUP_FAMILY_ID,
        personName: 'Rodzice',
        description: 'Pożyczka na wkład własny',
        date: '2025-10-01',
        totalAmount: 3000,
        type: EntryType.DEBT,
        status: EntryStatus.OVERDUE,
        installments: createFamilyInstallments('entry-rodzice'),
        installmentIntervalAmount: 1,
        installmentIntervalUnit: InstallmentIntervalUnit.MONTHS,
      },
    ],
  },
  {
    id: GROUP_BUSINESS_ID,
    name: 'Biznesowe',
    color: GroupColor.ORANGE,
    entries: [
      {
        id: 'entry-michal',
        groupId: GROUP_BUSINESS_ID,
        personName: 'Michał Dąbrowski',
        description: 'Projekt graficzny - identyfikacja wizualna',
        date: '2026-03-01',
        totalAmount: 1750,
        type: EntryType.RECEIVABLE,
        status: EntryStatus.OVERDUE,
        installments: [
          {
            id: 'entry-michal-inst-1',
            index: 1,
            amount: 875,
            plannedDueDate: '2026-04-01',
            dueDate: '2026-04-01',
            status: InstallmentStatus.PAID,
            paidAt: '2026-04-05',
            paymentMethod: 'Przelew',
          },
          {
            id: 'entry-michal-inst-2',
            index: 2,
            amount: 875,
            plannedDueDate: '2026-06-01',
            dueDate: '2026-06-01',
            status: InstallmentStatus.UNPAID,
          },
        ],
      },
    ],
  },
];

export function directionToEntryType(direction: EntryDirection): EntryType {
  return direction === EntryDirection.OWED_TO_ME ? EntryType.RECEIVABLE : EntryType.DEBT;
}
