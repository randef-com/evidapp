import {Test} from '@nestjs/testing';
import {CompaniesService} from "./companies.service";
import {CompaniesRepository} from "./companies.repository";
import {GetCompaniesFilterDto} from "./dto/get-companies-filter.dto";

const mockCompaniesRepository = () => ({
  getAllFiltered: jest.fn(),
});

describe('CompaniesService', () => {
  let companiesService;
  let companiesRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {provide: CompaniesRepository, useFactory: mockCompaniesRepository},
      ]
    }).compile();

    companiesService = await module.get<CompaniesService>(CompaniesService);
    companiesRepository = await module.get<CompaniesRepository>(CompaniesRepository);

  });

  describe('findAll', () => {
    it('Gets all companies from the repository', async () => {
      companiesRepository.getAllFiltered.mockResolvedValue('someVal');

      expect(companiesRepository.getAllFiltered).not.toHaveBeenCalled();
      const filters: GetCompaniesFilterDto = {search: "test"}

      const res = await companiesService.findAll(filters)

      expect(companiesRepository.getAllFiltered).toHaveBeenCalled();
      expect(res).toEqual('someVal')
    })
  })

});
