import {EntryDirection} from '@core/models/entry-direction.enum';
import {EntryStatus} from '@core/models/entry-status.enum';
import {EntryType} from '@core/models/entry-type.enum';
import {GroupColor} from '@core/models/group-color.enum';
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
    dueDate,
    status,
    paidAt,
    paymentMethod: status === InstallmentStatus.Paid ? 'Przelew' : undefined,
  };
}

function createFamilyInstallments(entryId: string): Installment[] {
  const months: string[] = [
    '2024-12-01',
    '2025-01-01',
    '2025-02-01',
    '2025-03-01',
    '2025-04-01',
    '2025-05-01',
    '2025-06-01',
    '2025-07-01',
    '2025-08-01',
    '2025-09-01',
    '2025-10-01',
    '2025-11-01',
  ];
  const paidDates: string[] = [
    '2024-12-05',
    '2025-01-03',
    '2025-02-02',
    '2025-03-01',
    '2025-04-04',
    '2025-05-02',
  ];

  return months.map((dueDate, index) => {
    const isPaid: boolean = index < 6;
    return {
      id: `${entryId}-inst-${index + 1}`,
      index: index + 1,
      amount: 250,
      dueDate,
      status: isPaid ? InstallmentStatus.Paid : InstallmentStatus.Unpaid,
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
    color: GroupColor.Blue,
    entries: [
      {
        id: 'entry-tomek',
        groupId: GROUP_FRIENDS_ID,
        personName: 'Tomek Brański',
        description: "Bilet na Impact'23",
        date: '2024-05-08',
        totalAmount: 200,
        type: EntryType.Debt,
        status: EntryStatus.Overdue,
        installments: [
          createSingleInstallment('entry-tomek', 200, '2024-05-08', InstallmentStatus.Unpaid),
        ],
      },
      {
        id: 'entry-anna',
        groupId: GROUP_FRIENDS_ID,
        personName: 'Anna Wiśniewska',
        description: 'Kolacja urodzinowa',
        date: '2024-05-02',
        totalAmount: 120,
        type: EntryType.Receivable,
        status: EntryStatus.Overdue,
        installments: [
          createSingleInstallment('entry-anna', 120, '2024-05-02', InstallmentStatus.Unpaid),
        ],
      },
      {
        id: 'entry-marek',
        groupId: GROUP_FRIENDS_ID,
        personName: 'Marek Kowalczyk',
        description: 'Wakacje Chorwacja 2025',
        date: '2024-04-20',
        totalAmount: 1400,
        type: EntryType.Receivable,
        status: EntryStatus.Overdue,
        installments: [
          {
            id: 'entry-marek-inst-1',
            index: 1,
            amount: 700,
            dueDate: '2024-06-01',
            status: InstallmentStatus.Unpaid,
          },
          {
            id: 'entry-marek-inst-2',
            index: 2,
            amount: 700,
            dueDate: '2024-08-01',
            status: InstallmentStatus.Unpaid,
          },
        ],
      },
    ],
  },
  {
    id: GROUP_FAMILY_ID,
    name: 'Rodzina',
    color: GroupColor.Green,
    entries: [
      {
        id: 'entry-rodzice',
        groupId: GROUP_FAMILY_ID,
        personName: 'Rodzice',
        description: 'Pożyczka na wkład własny',
        date: '2024-10-01',
        totalAmount: 3000,
        type: EntryType.Debt,
        status: EntryStatus.Overdue,
        installments: createFamilyInstallments('entry-rodzice'),
      },
    ],
  },
  {
    id: GROUP_BUSINESS_ID,
    name: 'Biznesowe',
    color: GroupColor.Orange,
    entries: [
      {
        id: 'entry-michal',
        groupId: GROUP_BUSINESS_ID,
        personName: 'Michał Dąbrowski',
        description: 'Projekt graficzny - identyfikacja wizualna',
        date: '2024-03-01',
        totalAmount: 1750,
        type: EntryType.Receivable,
        status: EntryStatus.Overdue,
        installments: [
          {
            id: 'entry-michal-inst-1',
            index: 1,
            amount: 875,
            dueDate: '2024-04-01',
            status: InstallmentStatus.Paid,
            paidAt: '2024-04-05',
            paymentMethod: 'Przelew',
          },
          {
            id: 'entry-michal-inst-2',
            index: 2,
            amount: 875,
            dueDate: '2024-06-01',
            status: InstallmentStatus.Unpaid,
          },
        ],
      },
    ],
  },
];

export function directionToEntryType(direction: EntryDirection): EntryType {
  return direction === EntryDirection.OwedToMe ? EntryType.Receivable : EntryType.Debt;
}
